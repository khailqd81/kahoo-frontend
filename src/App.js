import './App.css';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
const queryClient = new QueryClient()

function App() {

  // const handleSubmitForm = (values) => {
  //   axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, {
  //     ...values,
  //   roles:["Student"]})
  //   .then(function (response) {
  //     if (response.status === 201) {
  //       setRegisterSuccess(true);
  //       setErrorFromServer("");
  //     } 
  //   })
  //   .catch(function (error) {
  //     console.log("error:" ,error);
  //     setErrorFromServer(error.response.data.message);

  //   });
  // }

  return (
    <QueryClientProvider client={queryClient}>
    <div className='container mx-auto'>
      <div className=''>
          <Outlet />
      </div>
    </div>
    </QueryClientProvider>
  );
}

export default App;
