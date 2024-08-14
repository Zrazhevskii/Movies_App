import PropTypes from 'prop-types';
import './MoviesHeader.css';
import { Layout, Input, Tabs } from 'antd';

const { Header } = Layout;

export default function MoviesHeader({ handleChangeValue, valueSearch, handleSubmit }) {
   const itemSearch = [
      {
         key: '1',
         label: 'Search',
      },
      {
         key: '2',
         label: 'Rated',
      },
   ];

   return (
      <Header className="header">
         <Tabs destroyInactiveTabPane defaultActiveKey="1" items={itemSearch} onChange={() => {}} />
         <form className="form" onSubmit={(evt) => handleSubmit(evt)}>
            <Input
               placeholder="Type to search..."
               value={valueSearch}
               onChange={(evt) => handleChangeValue(evt)}
               required
            />
         </form>
      </Header>
   );
}

MoviesHeader.propTypes = {
   handleChangeValue: PropTypes.func.isRequired,
   valueSearch: PropTypes.string.isRequired,
   handleSubmit: PropTypes.func.isRequired,
};
