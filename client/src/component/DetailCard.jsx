// import { useParams } from "react-router-dom";
// import { API } from "../config/api";
// import { useState,useEffect } from "react";
// import { Container } from "react-bootstrap";
// import { FaMinusCircle, FaPlus, FaRegEdit } from "react-icons/fa";
// import ReactPlayer from "react-player";
// import Swal from "sweetalert2";
// import { Navigation } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import AddEpisodeModal from "./AddEpisode";
// import UpdateEpisodeModal from "./UpdateEpisode";
// import { useQuery } from "react-query";

// export default function Details() {
//   const { id } = useParams();
//   const [ascEpisode, setAscEpisode] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalIsOpenn, setModalIsOpenn] = useState(false);
//   const [selectedEpisode, setSelectedEpisode] = useState(null);
//   const [filteredEpisodes, setFilteredEpisodes] = useState([]);
//   const [filmId, setFilmId] = useState(null);
//   const [idEpisodeToDelete, setIdEpisodeToDelete] = useState(null);
//   function openModal() {
//     setModalIsOpen(true);
//   }

//   function closeModal() {
//     setModalIsOpen(false);
//   }
//   const openUpdateModal=(episode)=>{
//     setSelectedEpisode(episode);
//     setModalIsOpenn(true);
//   }

//   const handleEditEpisode= async (data) => {
//     try {
//       const response = await API.patch(`/episode/${selectedEpisode.id}`, data);

//       setSelectedEpisode(response.data.data);

//       // Update state films
//       const updatedEpisode = ascEpisode.map((episode) => {
//         if (episode.id === response.data.data.id) {
//           return response.data.data;
//         } else {
//           return episode;
//         }
//       });
//       setAscEpisode(updatedEpisode);
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Update Episode Success",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     } catch (error) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Edit Film Failed",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       console.log(error);
//     }
//   };

//   function closeUpdateModal() {
//     setModalIsOpenn(false);
//   }

//   // Fetching product data from database
//   let { data: films } = useQuery("filmCache1", async () => {
//     const response = await API.get(`/film/${id}`);
//     return response.data.data;
//   });

//   let { data: episode } = useQuery("episode", async () => {
//     const response = await API.get(`/film/${id}/episode`);
//     return response.data.data;
//   });

//   const handleDeleteEpisode = (id) => {
//     try {
     
//       Swal.fire({
//         title: 'yakin menghapus?',
//         text: "data tidak akan dapat dikembalikan!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#ff0000',
//         cancelButtonColor: '#FF00FF',
//         confirmButtonText: 'Hapus?'
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           await API.delete(`/episode/${id}`);
//           const updatedEpisode = ascEpisode.filter((episode) => episode.id !== id);
//           setAscEpisode(updatedEpisode);
//           setFilteredEpisodes(filmId ? updatedEpisode.filter((episode) => episode.film_id === filmId) : updatedEpisode);
//           Swal.fire(
//             'Deleted!',
//             'Your file has been deleted.',
//             'success'
//           )
//         }
//       })
      
//     } catch (error) {
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Delete Film Failed",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     idEpisodeToDelete && handleDeleteEpisode(idEpisodeToDelete);
//   }, [idEpisodeToDelete]);

//   return (
//     <>
//       <div>
//         <Container className="justify-content-center pt-5 mt-4">
//           <div>
//             <iframe width="100%" height="720" src={films?.linkfilm} alt="Video" allowFullScreen title="111" />
//           </div>
//           <div className="row mt-4">
//             <div className="col-md-2 col-6 mb-3">
//               <img className="rounded" src={"http://localhost:5000/uploads/" + films?.thumbnailfilm} width="200px" height="300px" style={{ objectFit: "cover" }} alt="Card" />
//             </div>
//             <div className="col-md-5 col-6 px-md-5">
//               <h2 className="fw-bold text-light mt-3">{films?.title}</h2>
//               <div className="d-flex gap-3">
//                 <p className="text-secondary fw-lighter ">{films?.year}</p>
//                 <p className="text-secondary fw-lighter border rounded pe-3 ps-3 mb-3">{films?.category.name}</p>
//               </div>
//               <p className="text-light" style={{ textAlign: "justify" }}>{films?.description}</p>
//             </div>
//             <div className="col-md-5">
//               <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//                 {episode?.map((data, i) => (
//                   <SwiperSlide key={i}>
//                     <div className="carousel-item active" >
//                       <ReactPlayer url={data.linkfilm} light={`http://localhost:5000/uploads/${data.thumbnailfilm}`} width={500} height={300} />
//                       <p className="text-center mt-2 text-light">{data.title}</p>
//                       <div className="d-flex justify-content-end gap-4">
                      
//                         <button onClick={() => {
//                           openUpdateModal(data);
//                         }} className="btn btn-outline-warning btn-sm me-2">
//                           <FaRegEdit /> Edit Episode
//                         </button>

//                         <button onClick={() => setIdEpisodeToDelete(data.id)} className="btn btn-outline-danger btn-sm">
//                           <FaMinusCircle /> Delete Episode
//                         </button>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
          
//               <button onClick={openModal} className="btn btn-outline-success btn-sm my-btn">
//                 <FaPlus /> Add Episode
//               </button>

//             </div>
//           </div>
//         </Container>
//         <AddEpisodeModal isOpen={modalIsOpen} closeModal={closeModal} />
//         <UpdateEpisodeModal isOpen={modalIsOpenn} closeModal={closeUpdateModal}  selectedEpisode={selectedEpisode} onSave={handleEditEpisode}/>
//       </div>

//     </>
//   );
// }

import {useQuery,useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaMinusCircle, FaPlus, FaRegEdit } from "react-icons/fa";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import AddEpisodeModal from "./AddEpisode";
import UpdateEpisodeModal from "./UpdateEpisode";

export default function Details() {
  const { id } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenn, setModalIsOpenn] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [idEpisodeToDelete, setIdEpisodeToDelete] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const openUpdateModal = (episode) => {
    setSelectedEpisode(episode);
    setModalIsOpenn(true);
  }


  function closeUpdateModal() {
    setModalIsOpenn(false);
  }

  // Fetching product data from database
  let { data: films } = useQuery("filmCache1", async () => {
    const response = await API.get(`/film/${id}`);
    return response.data.data;
  });

  let { data: episode,refetch } = useQuery("episode", async () => {
    const response = await API.get(`/film/${id}/episode`);
    return response.data.data.reverse();;
  });

  const handleDeleteEpisode = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await API.delete(`/episode/${id}`);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        refetch()
      })
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  
  useEffect(() => {
    idEpisodeToDelete && handleDeleteEpisode(idEpisodeToDelete);
  }, [idEpisodeToDelete]);

  return (
    <>
      <div>
        <Container className="justify-content-center pt-5 mt-4">
          <div>
            <iframe width="100%" height="720" src={films?.linkfilm} alt="Video" allowFullScreen title="111" />
          </div>
          <div className="row mt-4">
            <div className="col-md-2 col-6 mb-3">
              <img className="rounded" src={films?.thumbnailfilm} width="200px" height="300px" style={{ objectFit: "cover" }} alt="Card" />
            </div>
            <div className="col-md-5 col-6 px-md-5">
              <h2 className="fw-bold text-light mt-3">{films?.title}</h2>
              <div className="d-flex gap-3">
                <p className="text-secondary fw-lighter ">{films?.year}</p>
                <p className="text-secondary fw-lighter border rounded pe-3 ps-3 mb-3">{films?.category.name}</p>
              </div>
              <p className="text-light" style={{ textAlign: "justify" }}>{films?.description}</p>
            </div>
            <div className="col-md-5">
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {episode?.map((data, i) => (
                  <SwiperSlide key={i}>
                    <div className="carousel-item active" >
                      <ReactPlayer url={data.linkfilm} light={`${data.thumbnailfilm}`} width={500} height={300} />
                      <p className="text-center mt-2 text-light">{data.title}</p>
                      <div className="d-flex justify-content-end gap-4">
                        <button onClick={() => {
                          openUpdateModal(data);
                        }} className="btn btn-outline-warning btn-sm me-2">
                          <FaRegEdit /> Edit Episode
                        </button>

                        <button onClick={() => setIdEpisodeToDelete(data.id)} className="btn btn-outline-danger btn-sm">
                          <FaMinusCircle /> Delete Episode
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button onClick={openModal} className="btn btn-outline-success btn-sm my-btn">
                <FaPlus /> Add Episode
              </button>

            </div>
          </div>
        </Container>
        <AddEpisodeModal isOpen={modalIsOpen} closeModal={closeModal} refetch={refetch}/>
        <UpdateEpisodeModal isOpen={modalIsOpenn} closeModal={closeUpdateModal} selectedEpisode={selectedEpisode}  refetch={refetch}/>
      </div>

    </>
  );
}