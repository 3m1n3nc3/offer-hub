'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import CloseConflictModal from '@/components/dispute-resolution/close-conflict-modal';
import { DisputeRow } from '@/types';
import { FaChevronLeft } from 'react-icons/fa';
import Link from 'next/link';
import { MdGavel } from 'react-icons/md';
import { MessagesMain } from '@/components/messages/messages-main';
import { useMessages } from '@/hooks/useMessages';
import { useMockDisputes } from '@/data/generic-mock-data';

const types: { [key in NonNullable<DisputeRow['status']>]: string } = {
  active: 'Active Dispute',
  resolved: 'Resolved Dispute',
  unassigned: 'Unassigned Dispute',
};

export default function DisputeChat() {
  const { activeConversation, messages, handleSendMessage } = useMessages();

  const { disputes, loading } = useMockDisputes(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [dispute, setDispute] = useState<DisputeRow>();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirm = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setDispute(disputes[0]);
  }, [disputes]);

  const closeDisputeButton = (
    <Button
      className="py-5 text-white rounded-full bg-secondary-500"
      disabled={dispute?.status === 'resolved' || loading || !dispute}
      onClick={handleOpenModal}
    >
      <MdGavel /> Close conflict
    </Button>
  );

  return (
    <>
      <div className="inline-flex items-center justify-start w-full gap-2 p-4 mb-6 bg-transparent bg-white border-b">
        <Link
          href="/admin/dispute-resolution"
          className="flex items-center gap-x-2"
        >
          <FaChevronLeft size={12} className="text-gray-400" /> Back
        </Link>

        <div className="px-4 py-1 text-white rounded-full bg-secondary-500">
          {loading || !dispute ? 'Loading...' : types[dispute.status!]}
        </div>
      </div>
      <div className="flex h-full w-full lg:w-[714px] mx-auto bg-white rounded-lg">
        <MessagesMain
          activeConversation={activeConversation}
          messages={messages}
          dispute={dispute}
          loading={loading}
          onSendMessage={handleSendMessage}
          chatHeaderItem={closeDisputeButton}
        />
        <CloseConflictModal
          open={modalOpen}
          dispute={dispute}
          loading={loading}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          setDispute={setDispute}
        />
      </div>
    </>
  );
}
