export interface QRCodeDetails {
  id: string;
  name: string;
  email: string;
  room: string;
}

// export function useQRCodeDetails(userId: string | undefined): QRCodeDetails {
//   const [details, setDetails] = useState<QRCodeDetails>({
//     id: "",
//     name: "",
//     email: "",
//     room: "",
//   });

//   useEffect(() => {
//     async function fetchQRCodeDetails() {
//       if (userId) {
//         const [{ name: fetchedName, email: fetchedEmail, room: fetchedRoom }] =
//           await getDetailsForQRCode(userId);
//         setDetails({
//           id: userId,
//           name: fetchedName,
//           email: fetchedEmail,
//           room: fetchedRoom,
//         });
//       }
//     }
//     fetchQRCodeDetails();
//   }, [userId]);

//   return details;
// }
