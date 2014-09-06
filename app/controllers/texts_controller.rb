require 'time'

class TextsController < ApplicationController

	respond_to :json

	def create
		time = (params[:when_send] == "now") ? Time.now : (params[:when_send] == "then") ? (Time.parse(params[:departure_time]) - (60 * 60)) : false
		departure_time = Time.parse(params[:departure_time]).strftime("%H:%M%p")
		directions = "Remember to leave at #{departure_time}. #{params[:instructions]}"
	
		# text = Text.create(to: params[:phone_number], instructions: directions)
		# text.delay(run_at: time).send_message
		render json: {success: 200}
	end

	def confirmation
	end



end
