# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron
# Learn more: http://github.com/javan/whenever

# rake_with_lock makes sure only a since instance of the job can run at once on a single server
# requires 'flock', available in util-linux or for local testing on mac osx: https://github.com/discoteq/flock
# Note: the lock file should always be present in the filesystem, flock doesn't work by using the file's presence or not
job_type :rake_with_lock, "cd :path && :environment_variable=:environment flock -n :lock bundle exec rake :task --silent --backtrace :output"

log_root = 'TODO /srv/YOUR_APP_NAME/shared/log/'

every 1.hour do
  # example: call your rake task like this
  # rake_with_lock 'reconcile_analytics', output: "#{log_root}reconcile_analytics.log", lock: "#{log_root}reconcile_analytics.lock"
end

every :day do
  command "sudo certbot renew", output: "#{log_root}cert_renew.log"
end
