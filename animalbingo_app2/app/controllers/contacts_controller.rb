class ContactsController < ApplicationController
  skip_before_action :require_login
    def new
        @contact = Contact.new
      end
    
      def create
        @contact = Contact.new(contact_params)
        if @contact.save
          ContactMailer.contact_mail(@contact).deliver_now
          redirect_to root_path, notice: 'お問い合わせ内容を送信しました'
        else
          redirect_to new_contact_path
        end
      end
    
      private
    
      def contact_params
        params.require(:contact).permit(:name, :message)
      end   
end
