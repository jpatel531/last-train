require 'time'

class TextsController < ApplicationController

	respond_to :json

	def create
		time = (params[:when_send] == "now") ? Time.now : (params[:when_send] == "then") ? (Time.parse(params[:departure_time]) - (60 * 60)) : false
		text = Text.create(to: params[:phone_number], instructions: params[:instructions])
		text.delay(run_at: 2.minutes.from_now).send_message
		render json: {success: 200}
	end

end
