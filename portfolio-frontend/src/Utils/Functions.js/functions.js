export const handleDetailPageNavigation = (navigate, pathPrefix, item,reload) => {

    let url;
    if (pathPrefix === "projects") {
        url = `/${pathPrefix}/project_id=${item.id}`;
    } else {
        url = `/${pathPrefix}/my_blog=${item.id}`;
    }
    navigate(url);
    if(reload){
        window.location.reload();
    }

}