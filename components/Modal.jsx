import { useAppContext } from '@/context/AuthContext';
import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose }) => {
    const {
        events,
        selectedDate,
        modalContent,
        setModalContent,
        handleAddEvent,
        handleEditEvent,
        handleSaveEdit,
        handleDeleteEvent,
    } = useAppContext();
    const modalRef = useRef(null);

    const handleConfirm = () => {
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.classList.add('overflow-hidden');
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.body.style.paddingRight = '';
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.style.paddingRight = '';
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className={`fixed smooth-entry text-black inset-0 flex items-center justify-center ${isOpen ? 'z-50' : 'hidden'}`}>
            {/* Background blur */}
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

            {/* Modal content */}
            <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg p-10 z-10">
                <button className="absolute top-0 font-bold text-xl right-0 p-3 rounded-md" onClick={onClose}>
                    X
                </button>
                {/* modal data  */}
                <div className="bg-white p-3 rounded border">
                    <h3 className="font-bold mb-2">
                        {modalContent.type === "add" ? "Add Event" : "Edit Event"}
                    </h3>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={modalContent.event}
                        onChange={(e) => {
                            setModalContent({ ...modalContent, event: e.target.value })
                        }
                        }
                        className="w-full p-2 border rounded mb-2"
                    />
                    <select
                        value={modalContent.category}
                        onChange={(e) =>
                            setModalContent({ ...modalContent, category: e.target.value })
                        }
                        className="w-full p-2 border rounded mb-4"
                    >
                        <option value="">Select Category</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="flex justify-between">
                        {modalContent.type === "add" ? (
                            <button
                                onClick={() => {
                                    handleAddEvent()
                                    handleConfirm()
                                }}
                                className="mt-4 mx-5 bg-blue-500 w-full text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    handleSaveEdit()
                                    handleConfirm()
                                }}
                                className="mt-4 mx-5 bg-blue-500 w-full text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setModalContent({ type: "add", event: "", category: "" })
                                onClose()
                            }
                            }
                            className="mt-4 bg-slate-400 w-full text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                {selectedDate && (
                    <div className="mt-4">
                        {events[selectedDate] ? <h2 className="text-lg font-bold mb-2">
                            Events on {selectedDate}
                        </h2>
                            :
                            <h2 className="text-sm text-center">
                                No events on {selectedDate}
                            </h2>
                        }
                        <ul className="mb-4">
                            {(events[selectedDate] || []).map((event, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center mb-2"
                                >
                                    <span
                                        className={`text-gray-800 ${event.category === "work"
                                            ? "text-red-500"
                                            : event.category === "personal"
                                                ? "text-green-500"
                                                : "text-blue-500"
                                            }`}
                                    >
                                        {event.name}
                                    </span>
                                    <div>
                                        <button
                                            className="text-blue-500 mr-2"
                                            onClick={() => handleEditEvent(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteEvent(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;


