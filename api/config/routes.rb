# frozen_string_literal: true

Rails.application.routes.draw do
  get :ping, to: "status#show"

  root to: redirect("/docs")
end
