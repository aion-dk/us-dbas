# frozen_string_literal: true

RSpec.configure do |config|
  config.before do |e|
    Rails.cache.clear unless e.metadata[:cache]
  end
end
