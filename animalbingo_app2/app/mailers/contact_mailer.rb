class ContactMailer < ApplicationMailer
    def contact_mail(contact)
        @contact = contact
        #mail to: ENV['TOMAIL'], subject: 'お問い合せ内容'
        #mail to: "kudo1125maki@gmail.com", subject: 'お問い合せ内容'
        mail to: "animalbingoapp@gamil.com", subject: 'お問い合せ内容'
    end
end
