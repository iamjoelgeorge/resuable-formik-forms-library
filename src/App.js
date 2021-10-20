import './App.css';
import BoxGallery from './components/BoxGallery/BoxGallery';
import CardBackground from './components/Box/Box';
import TestForm from './components/TestForm/TestForm';
import BoxGalleryTest from './components/BoxGallery/BoxGalleryTest/BoxGalleryTest';
import CustomInput from './components/CustomInput/CustomInput';
import { Provider, useSelector } from 'react-redux';

import store from './redux/store';
// import CustomForm from './components/CustomForm/CustomForm';
import FormOne from './components/CustomFormikForm/FormOne/FormOne';
import CustomForm from './components/CustomForm/CustomForm';
import FormTwo from './components/CustomFormikForm/FormTwo/FormTwo';
import FormThree from './components/CustomFormikForm/FormThree/FormThree';
import FormFour from './components/CustomFormikForm/FormFour/FormFour';
import FormFive from './components/CustomFormikForm/FormFive/FormFive';
import FormSix from './components/CustomFormikForm/FormSix/FormSix';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        {/* <TestForm /> */}
        {/* <BoxGallery /> */}
        {/* <BoxGalleryTest /> */}
        {/* <CustomForm initialValues={initialValuesFormOne} /> */}
        {/* <FormFive /> */}
        {/* <FormTwo /> */}
        {/* <FormThree /> */}
        {/* <FormFour /> */}
        <FormOne />
        {/* <FormSix /> */}
      </div>
    </Provider>
  );
}

export default App;
