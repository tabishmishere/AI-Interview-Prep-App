import React, { useCallback, useEffect, useState } from "react";
import { LuPlus, LuSparkles } from "react-icons/lu";
import { CARD_BG } from "../../utils/data.js";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import SummaryCard from "../../components/Cards/SummaryCard.jsx";
import moment from "moment";
import Modal from "../../components/Model.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import {
  fetchSessions,
  deleteSessionById,
} from "../../services/sessionService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const loadSessions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toast.error("Could not load sessions.");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const handleConfirmDelete = async () => {
    const id = openDeleteAlert.data?._id;
    if (!id) return;
    try {
      await deleteSessionById(id);
      toast.success("Session removed.");
      setOpenDeleteAlert({ open: false, data: null });
      loadSessions();
    } catch (e) {
      console.error(e);
      toast.error("Could not delete session.");
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 md:px-6 pt-6 pb-8 max-w-6xl">
        <div className="rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white to-[#fff9f2] p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-2 flex items-center gap-2">
                <LuSparkles className="w-4 h-4" />
                Your workspace
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Interview sessions
              </h1>
              <p className="text-sm text-gray-600 mt-2 max-w-xl">
                Open a session to practice Q&amp;A, add notes, and explore
                deeper explanations. Create a new one anytime.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <div className="rounded-xl bg-white/80 border border-gray-200 px-4 py-3 text-center min-w-[100px]">
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.length}
                </p>
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Sessions
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 rounded-full border-2 border-orange-200 border-t-orange-500 animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 py-16 px-6 text-center">
            <p className="text-gray-800 font-medium text-lg">
              No sessions yet
            </p>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Create your first session to get role-specific questions and
              answers. You can start with mock data while wiring the API.
            </p>
            <button
              type="button"
              onClick={() => setOpenCreateModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black text-white text-sm font-semibold px-6 py-3 hover:bg-gray-800"
            >
              <LuPlus className="w-5 h-5" />
              Create session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience ?? "-"}
                questions={data?.questions?.length || 0}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).fromNow()
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() =>
                  setOpenDeleteAlert({ open: true, data })
                }
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className="h-14 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm text-white font-semibold px-6 rounded-full hover:brightness-95 cursor-pointer shadow-lg shadow-orange-500/25 fixed bottom-8 md:bottom-10 right-6 md:right-10 z-20 transition-all"
        onClick={() => setOpenCreateModal(true)}
        aria-label="Add new session"
      >
        <LuPlus className="text-xl" />
        New session
      </button>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        title="New session"
        subtitle="Tell us about the role — we’ll match questions and answers to your profile."
      >
        <CreateSessionForm
          onCreated={() => {
            setOpenCreateModal(false);
            loadSessions();
          }}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete session?"
      >
        <p className="text-sm text-gray-600 mb-6">
          This removes the session and its questions from your workspace. This
          cannot be undone.
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setOpenDeleteAlert({ open: false, data: null })}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-lg bg-rose-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-rose-700"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
