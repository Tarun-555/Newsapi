import React from "react";
import classes from "./Card.module.css"

const card = (props) => {
    return (
      <div className={classes.card}>
          <img src={props.info.image} alt="img" className={classes.img}/>
          <h4 className={classes.title}>{props.info.title}</h4>
          <p className={classes.description}>{props.info.description}</p>
          <a href={props.info.url} className={classes.more}>more...</a>
          <span className={classes.date}>{props.info.publishedAt}</span>
      </div>
    );
}

export default card;