import { setHomePageData } from "../../../redux/Reducers/HomeDataReducer";
import { setPageLoading } from "../../../redux/Reducers/PageLoadingReducer";
import axiosClient from "../axiosClient";
import { toast } from "react-hot-toast";

export const getHomePageData = (setHomeData, dispatch, navigate) => {
  try {
    dispatch(setPageLoading(true));
    axiosClient
      .get("/home")
      .then((res) => {
        dispatch(setHomePageData(res.data));
        setHomeData(res.data);
        setTimeout(() => {
          dispatch(setPageLoading(true));
        }, 500)
      })
      .catch((err) => {
        console.log(err)
        dispatch(setPageLoading(false));
        navigate('/error/404');
      });
  } catch (error) {
    console.log(error);
    dispatch(setPageLoading(false));
    navigate('/error/404');
  }
};

export const getListsData = (dispatch, navigate, location, listData, setListData) => {
  try {
    dispatch(setPageLoading(true));
    let url;
    if (location.search !== "") {
      url = location.pathname + location.search;
    } else {
      url = location.pathname;
    }
    axiosClient
      .get(url)
      .then((res) => {
        if (listData) {
          setListData((prev) => ({
            ...res.data,
            data: [...prev.data, ...res.data.data],
          }));
        } else {
          setListData(res.data);
        }
        setTimeout(() => {
          dispatch(setPageLoading(false));
        }, 500)
      })
      .catch((err) => {
        console.log(err);
        dispatch(setPageLoading(false));
        navigate('/error/404');
      });
  } catch (error) {
    console.log(error);
    dispatch(setPageLoading(false));
    navigate('/error/404');
  }
};

export const getDetailsData = (dispatch, navigate, params, setDetails) => {
  try {
    dispatch(setPageLoading(true));
    axiosClient
      .get(params)
      .then((res) => {
        setDetails(res.data);
        setTimeout(() => {
          dispatch(setPageLoading(false));
        }, 500)
      })
      .catch((err) => {
        console.log(err);
        dispatch(setPageLoading(false));
        navigate('/error/404');
      });
  } catch (error) {
    console.log(error);
    dispatch(setPageLoading(false));
    navigate('/error/404');
  }
};

export const getCommentsData = (params, comments, setCommentsData, setCommentsLoader, more) => {
  try {
    setCommentsLoader(true);
    axiosClient
      .get(params)
      .then((res) => {
        if (comments && more) {
          setCommentsData((prev) => ({ ...res.data, data: [...prev.data, ...res.data.data] }));
        } else {
          setCommentsData(res.data);
        }
        setCommentsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setCommentsLoader(false);
      });
  } catch (error) {
    console.log(error);
    setCommentsLoader(false);
  }
};

export const getRecentList = (params, setRecentListData) => {
  try {
    axiosClient
      .get(params)
      .then((res) => {
        setRecentListData((prev) => ([...res.data]));
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
        toast.success('Message sent!')
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        toast.error("Could not send message.");
      });
  } catch (error) {
    console.log(error);
    setSubmitting(false);
    toast.error("Could not send message.");
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
        toast.success('Commented successfully!')
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        toast.error("Could not send comment.");
      });
  } catch (error) {
    console.log(error);
    setSubmitting(false);
    toast.error("Could not send comment.");
  }
};
