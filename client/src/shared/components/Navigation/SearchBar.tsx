import { TextField } from "@mui/material";
import { setSearchQuery } from "../../../reducers/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.question.searchQuery
  );

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value.toLowerCase()));
  };

  return (
    <form onSubmit={submitHandler}>
      <TextField
        sx={{
          flex: 1,
          marginRight: "10px",
        }}
        label="Search..."
        type="search"
        value={searchQuery}
        onChange={changeHandler}
      />
    </form>
  );
};

export default SearchBar;
