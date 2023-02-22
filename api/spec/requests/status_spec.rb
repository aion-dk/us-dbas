require 'rails_helper'

RSpec.describe "Statuses", type: :request do
  describe "GET /ping" do
    let(:url) { "/ping" }
    it_behaves_like "http status"
  end
end
