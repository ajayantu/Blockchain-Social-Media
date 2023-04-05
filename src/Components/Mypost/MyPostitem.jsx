import React from 'react'
import "./mypostitem.css"
import postimg from "../../../src/assets/postimg.jpg"

const MyPostitem = () => {
    return (
        <div className='MyPostitem'>
            <header>
                <li>
                    Ashna Saju
                </li>
                <li>
                    18/03/2023
                </li>
            </header>
            <section>
                <img src={postimg} alt="post image" height={100} />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consequuntur praesentium excepturi veritatis, odit recusandae repellendus iure cum est libero dolores sequi eius hic impedit vitae rerum suscipit velit odio?</p>
            </section>
        </div>
    )
}

export default MyPostitem