# frozen_string_literal: true

require "rails_helper"

RSpec.describe Hash do
  describe "#bury" do
    let(:hash) do
      {
        a: :b,
        c: {
          d: [],
        },
      }
    end

    it "buries the value at the given path" do
      new_hash = hash.bury :e, :f, "hello"
      expect(new_hash).to eql({
                                a: :b,
                                c: {
                                  d: [],
                                },
                                e: {
                                  f: "hello",
                                },
                              })
    end
  end

  describe "#deep_compact" do
    let(:hash) do
      {
        a: nil,
        b: {
          e: 1,
          f: {},
        },
        c: [],
        d: 1,
      }
    end

    it "compacts the hash, including nested, compactable values" do
      expect(hash.deep_compact).to eql({ b: { e: 1 }, d: 1 })
    end
  end
end
