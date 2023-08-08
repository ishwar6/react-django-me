export const handleDetailPageNavigation = (navigate, pathPrefix, item, reload) => {

    let url;
    url = `/${pathPrefix}/${item.slug}`;
    navigate(url);
    if (reload) {
        window.location.reload();
    }

}