import React from "react";
import { Modal, Input, Loading } from "@nextui-org/react";

const DoctorSearchModal = ({
  isOpen,
  onClose,
  searchTerm,
  setSearchTerm,
  isLoading,
  error,
  filteredDoctors,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>
        <Input
          clearable
          placeholder="Search by Name or Specialist"
          onChange={(e) => setSearchTerm(e.target.value)}
          width="100%"
          value={searchTerm}
        />
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : error ? (
          <p>{error}</p>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="mb-4">
              <h3>{`${doctor.firstName} ${doctor.lastName}`}</h3>
              <p>{doctor.specialist}</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DoctorSearchModal;
