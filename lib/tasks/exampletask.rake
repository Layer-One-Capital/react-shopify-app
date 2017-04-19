task :exampletask => :environment do
  puts "#{Time.now.getutc} Starting example task..."
  logger = Logger.new('/srv/exampleapp/shared/log/exampletask.log')

  service = ExampleJob.new(logger)
  one_done = true
  while one_done
    one_done = service.send_one
  end

  puts "#{Time.now.getutc} Finished example task."
end
