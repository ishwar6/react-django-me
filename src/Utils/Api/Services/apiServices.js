import { setHomePageData } from "../../../redux/Reducers/HomeDataReducer";
import axiosClient from "../axiosClient";

export const getHomePageData = (setHomeData, dispatch) => {
  try {
    axiosClient
      .get("/")
      .then((res) => {
        dispatch(setHomePageData(res.data));
        setHomeData(res.data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getListsData = (pathName, listData, setListData) => {
  try {
    axiosClient
      .get(pathName)
      .then((res) => {
        if (listData) {
          setListData((prev) => ({
            ...prev,
            data: [...prev.data, res.data.data],
          }));
        } else {
          setListData(res.data);
        }
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getDetailsData = (params, setDetails) => {
  try {
    axiosClient
      .get(params)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsData = (params, setCommentsData) => {
  try {
    axiosClient
      .get(params)
      .then((res) => {
        setCommentsData((prev)=>([...res.data]));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getRecentList = (params, setRecentListData) => {
  try {
    axiosClient
      .get(params)
      .then((res) => {
        setRecentListData((prev)=>([...res.data]));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = (values, setSubmitting, resetForm) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("subject", values.subject);
    formData.append("message", values.message);
    axiosClient
      .post("/contact-me/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setSubmitting(false);
        resetForm();
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    setSubmitting(false);
  }
};

export const PostComment = (values, setSubmitting, resetForm) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("my_blog", values.id);
    formData.append("message", values.message);
    axiosClient
      .post("/blog-comments/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setSubmitting(false);
        resetForm();
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    setSubmitting(false);
  }
};
