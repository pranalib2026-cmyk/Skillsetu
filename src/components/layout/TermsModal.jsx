import React from 'react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

const TermsModal = ({ isOpen, onAccept, onDecline }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onDecline} 
      title="Skillsetu Terms & Conditions"
    >
      <div className="space-y-4 text-sm text-gray-600">
        <p>By using the Skillsetu platform, you agree to the following terms:</p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Booking Concept:</strong> One booking equals one working day.</li>
          <li><strong>Extensions:</strong> Extension requires a new payment.</li>
          <li><strong>Refunds:</strong> Payment is non-refundable after work starts.</li>
          <li><strong>Authenticity:</strong> Fake work posts will result in an account ban.</li>
          <li><strong>Video Verification:</strong> Fake skill videos result in a permanent ban.</li>
          <li><strong>Exit Process:</strong> Workers can request an Exit Certificate after 30 days.</li>
          <li><strong>Dispute Resolution:</strong> Disputes are handled by the Skillsetu Admin Team.</li>
          <li><strong>Fees:</strong> The platform charges a service fee.</li>
          <li><strong>Information:</strong> Users must keep contact info updated.</li>
        </ul>

        <div className="pt-6 flex gap-3 justify-end border-t border-gray-100 mt-6">
          <Button variant="ghost" onClick={onDecline}>
            Decline
          </Button>
          <Button variant="primary" onClick={onAccept}>
            I Agree
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
