class Text < ActiveRecord::Base


	def client
		Twilio::REST::Client.new(
			Rails.application.secrets.twilio_id, 
			Rails.application.secrets.twilio_secret)
	end

	def send_message
		client.account.messages.create(
			from: 441295477003,
			to: to,
			body: instructions
		)
	end


end
