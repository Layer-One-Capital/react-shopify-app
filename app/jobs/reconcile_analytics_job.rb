class ReconcileAnalyticsJob

  def initialize(logger)
    @logger = logger
  end

  def send_one
    # prefer processing one record at once as it is more resilient
    @logger.info 'Getting next_eligible...'
    next_user = next_eligible
    if next_user == nil
      @logger.info 'None eligible.'
      return false
    else
      @logger.info 'Attempting one...'
      reconcile(next_user)
      @logger.info 'One attempted.'
      return true
    end
  end

  private

  def next_eligible
    return nil
  end

  def reconcile(user)

  end
end
