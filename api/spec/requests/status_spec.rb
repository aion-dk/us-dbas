# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Statuses" do
  describe "GET /ping" do
    let(:url) { "/ping" }

    it_behaves_like "http status"
  end
end
