import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { ADD_REACTION, REMOVE_REACTION } from "../utils/mutations";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";

import Icon from "@mui/material/Icon";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";

const Reaction = ({ allowDelete, userData }) => {



 
  const { loading, data } = useQuery(GET_ME);

  const selfData = data?.me || {};
  


  const [addReaction] = useMutation(ADD_REACTION);
  const [removeReaction] = useMutation(REMOVE_REACTION);

  const [reactionCount, setReactionCount] = useState(userData.reactionCount);

  const [buttonOn, setButtonOn] = useState(false);

 

  

  if (loading) {
    return;
    <h2>Loading..</h2>;
  }

  const reaction = async (userId, username) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
  

    try {
      await addReaction({
        variables: { userId: userId, username: username },
      });

      setReactionCount(userData.reactionCount + 1);
      setButtonOn(true);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (reactionId, userId) => {
  
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeReaction({
        variables: { reactionId: reactionId, userId: userId },
      });

      setReactionCount(userData.reactionCount - 1);
      setButtonOn(false);
      window.location.reload();
    } catch (err) {}
  };

  // const checkUser = userData.reactions.map((id)=> id._id)
  // const checkSelf  = selfData.reacted.map((id)=> id._id)



  const checkA = new Set(userData.reactions.map(({ _id }) => _id));

  const result = selfData.reacted.map(({ _id }) => ({
    _id,
    isavailable: checkA.has(_id),
  }));

  const reacted = result.filter((answer) => answer.isavailable);

  const match = reacted.map((id) => id.isavailable);

  const reactId = reacted.map((id) => id._id);

  return (
    <div>
      <Badge
        aria-label={`Reactions: ${reactionCount}`}
        badgeContent={reactionCount}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color="primary"
      >
        {buttonOn || match[0] || allowDelete ? (
          <IconButton
            disabled={allowDelete}
            onClick={() => remove(reactId[0], userData._id)}
          >
            <FavoriteIcon sx={{ color: "red", fontSize: 40 }} />
          </IconButton>
        ) : (
          !allowDelete && (
            <IconButton
              onClick={() => reaction(userData._id, selfData.username)}
            >
              <FavoriteBorderIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )
        )}
      </Badge>
    </div>
  );
};

export default Reaction;
