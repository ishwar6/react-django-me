import React from 'react'
import { handleDetailPageNavigation } from '../../../Utils/Functions.js/functions'
import { useNavigate } from 'react-router-dom'
import { BASEURL } from '../../../Utils/Api/axiosClient';
import moment from 'moment';

function RecentSection({ recentItem }) {
    const navigate = useNavigate();
    const pathPrefix = location.pathname.split("/")[1];

    return (
        <div className="block-21 mb-4 d-flex" key={recentItem.id} onClick={() => handleDetailPageNavigation(navigate, pathPrefix, recentItem,true)}>
            {recentItem?.file && (
                <a
                    className="blog-img mr-4"
                    style={{
                        backgroundImage: `url(${BASEURL + recentItem?.file
                            })`,
                        border: "2px solid white",
                    }}
                ></a>
            )}
            <div className="text">
                {recentItem?.name !== "" && (
                    <h3 className="heading">
                        <a>{recentItem?.name}</a>
                    </h3>
                )}
                <div className="meta">
                    <div>
                        <a>
                            <span className="icon-calendar"></span>
                            {moment(recentItem.created_at).format(
                                "MMMM DD, YYYY"
                            )}
                        </a>
                    </div>
                    {recentItem?.comment_count > 0 && (
                        <div>
                            <a>
                                <span className="icon-chat"></span>
                                {recentItem?.comment_count}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RecentSection