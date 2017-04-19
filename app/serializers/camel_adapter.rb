class CamelAdapter < ActiveModel::Serializer::Adapter::Json

  def serializable_hash(options = nil)
    if @serializer.meta
      snake_hash = super
    else
      snake_hash = super[super.keys.first]
    end

    deep_camel_case_params(snake_hash)
  end

  def include_meta(json)
    json[meta_key] = deep_camel_case_params(meta) if meta
    json
  end

  private

  def deep_camel_case_params(val = params)
    case val
    when Array
      val.map {|v| deep_camel_case_params v }
    when ActiveModel::Errors
      deep_camel_case_params(val.messages)
    when Hash
      new_hash = {}
      val.each_pair do |k, v|
        new_hash[k.to_s.camelize(:lower)] = deep_camel_case_params(v)
      end
      new_hash
    else
      val
    end
  end
end
