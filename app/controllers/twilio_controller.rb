class TwilioController < ApplicationController
	include Webhookable

  after_filter :set_header

  skip_before_action :verify_authenticity_token

  def first_text
    boot_twilio
    sms = @client.messages.create(
      from: Rails.application.secrets.twilio_number,
      to: params["From"],
      body: "Thank you for using FLEX Chat!\nTo message a flexmate please use the following template:\nTo:(Flexmates Name)\nBody: (Fill in message here)."
    )
  end

	def receive_sms
    if params.values.include?("Tutorial")
      first_text
    else
      reply
      render nothing: true
    end
  end

  def reply
    sender = User.find_by(phone: params["From"][2..-1])
    receiver_first_name =  params["Body"].match(/:(.*)/)[1][1..-1]
    receiver_number = User.find_by(first_name: receiver_first_name).phone
    text_body = params["Body"]
    message_body = text_body
    boot_twilio
    sms = @client.messages.create(
      from: Rails.application.secrets.twilio_number,
      to: "+1#{receiver_number}",
      body: message_body + "\n-From #{sender.first_name}"
    )
  end

private
  def boot_twilio
    account_sid = Rails.application.secrets.twilio_account_sid
    account_token = Rails.application.secrets.twilio_token
    @client = Twilio::REST::Client.new account_sid, account_token
  end
end
