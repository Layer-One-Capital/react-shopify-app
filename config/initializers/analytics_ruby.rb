Analytics = Segment::Analytics.new({
     write_key: ENV['segment_write_key'],
     on_error: Proc.new { |status, msg| print msg }
 })
