import React, { useEffect, useMemo } from "react";
import ContentTitle from "../../../components/Common/ContentTitle";
import { fetchLectureLessons, fetchLesson, updateLesson } from "../../../store/modules/lessonsSlice";
import wrapper from "../../../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import AttachmentListCard from "../../../components/Common/AttachmentListCard";
import CommentCard from "../../../components/Common/CommentCard";
import AttendanceCard from "../../../components/Common/AttendanceCard";
import { FaClock } from "react-icons/fa";
import moment from "moment";
import "moment/locale/ko"
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import VideoListCard from "../../../components/Common/VideoListCard";
import { fetchEnrolls } from "../../../store/modules/enrollsSlice";
import { fetchLessonAttendances } from "../../../store/modules/attendancesSlice";
import { fetchLessonVideos } from "../../../store/modules/videosSlice";
import { fetchLessonTests } from "../../../store/modules/testsSlice";
import { fetchLessonAttachments } from "../../../store/modules/attachmentsSlice";
import { BiDotsHorizontalRounded, BiEdit } from "react-icons/bi";
import ChangeLessonStatusModal from "../../../components/Modals/ChangeLessonStatusModal";
import { modalOpen } from "../../../store/modules/modalSlice";
import ChangeLessonTimeModal from "../../../components/Modals/ChangeLessonTimeModal";
import CreateLessonForm from "../../../components/Forms/CreateLessonForm";


const AdminLessonCreatePage = ({ lessonData, upcomingLessonsData, completedLessonsData }) => {
  
    // 진행여부
    return (
        <div className="row">
            <ContentTitle title="일일 수업 생성" mainTitle="강의 관리" />
            <div className="card">
                <div className="card-body">
                    <CreateLessonForm/>
                </div>
            </div>
        </div>
    );
};

AdminLessonCreatePage.layout = "L1";

export default AdminLessonCreatePage;
