import React from "react";
import { useQuery } from "@apollo/client";
import { GET_All_USERS } from "../utils/queries";
import { Box, Grid, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Badge from "@mui/material/Badge";

import { Link } from "react-router-dom";

const Aside = () => {

  const lightGrey = grey[400];
  const darkGrey = grey[800];
  const { loading, data } = useQuery(GET_All_USERS);

  const userData = data?.users || [];

  return (
    <Container sx={{
      py: 1,
      backgroundColor: darkGrey,
      opacity: [0.90],
      width: '90%',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: 10
    }}>
      {userData.map((users) =>
        users.topFour.length < 4 ? null : (
          <Container
            sx={{
              my: 4,
              py: 4,
              border:'1px solid white',
              borderRadius:6,

            }}>
            <Link className="aside-medley-username" to={users.username} underline="none">
              {users.username}
            </Link>
            <Container
              sx={{
                py: 1
              }}>
              <Container>
                {users.reactionCount > 0 ? <Badge
                  aria-label={`Reactions: ${users.reactionCount}`}
                  badgeContent={users.reactionCount}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  color="primary"
                >
                  <FavoriteIcon sx={{ color: "red", fontSize: 30 }} />
                </Badge> : <Badge
                  aria-label={`Reactions: ${users.reactionCount}`}
                  badgeContent={users.reactionCount}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  color="primary"
                >
                  <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                </Badge>}
              </Container>
              <Container
                sx={{
                  my:2,
                  py: 4,
                  borderRadius: 6,
                  backgroundColor: lightGrey
                }}>
                <Grid container direction="row" justifyContent="space-between"
                  sx={{
                    backgroundColor: lightGrey,
                    borderRadius: 6,
                  }}
                >
                  {users.topFour.map((topFour) => (
                    <Box key={users}
                    sx={{
                      m:2,
                    }}>
                      <img src={topFour.image} alt={topFour.album_name}></img>
                    </Box>
                  ))}
                </Grid>
              </Container>
            </Container>
          </Container>
        )
      )}
    </Container>
  );
};

export default Aside;
