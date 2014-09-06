require 'journey_planner'
require 'time'

class JourneysController < ApplicationController

	respond_to :json

	def create
		client = TFLJourneyPlanner::Client.new(app_id: Rails.application.secrets.tfl_id, app_key: Rails.application.secrets.tfl_key)
		date = (Time.now < Time.parse('5am')) ? nil : (Time.now + (60 * 60 * 24)).strftime("%Y%m%d")
		@journeys = client.get_journeys from: params[:from], to: params[:to], time: "0300", time_is: "Arriving", date: date
		render "create.json.jbuilder"
	end

	def index
	end


end
