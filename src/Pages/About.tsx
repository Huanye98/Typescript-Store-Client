import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Link,
  Typography,
} from "@mui/material";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { useMediaQuery } from "react-responsive";

function About() {
  const artists = [
    {
      name: "A",
      description: "aaaaaaa",
      linktree: "linktree.aaaaaa",
    },
    {
      name: "B",
      description: "bbbbbbb",
      linktree: "linktree.bbbbbb",
    },
    {
      name: "C",
      description: "ccccccc",
      linktree: "linktree.cccccc",
    },
    {
      name: "D",
      description: "ddddddd",
      linktree: "linktree.dddddd",
    },
  ];
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });
  return (
    <>
      <Nav />

      <Box>
        <Box sx={{ top: "67px", margin: "100px 0", position: "sticky" }}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", padding: "60px 0", zIndex: 3 }}
          >
            Canvas & Chaos
          </Typography>
        </Box>
        <img src={"/aboutImage.webp"} style={{ width: "100vw", left: 0 }} />
        <Container>
          <Typography sx={{ mb: 3 }}>
            Welcome to Canvas & Chaos – Where Art Meets Expression Step into a
            world where creativity knows no bounds. At Canvas & Chaos, we
            celebrate the raw, vibrant, and unapologetic spirit of art in every
            form. Whether you're an artist, an art enthusiast, or someone who
            simply appreciates unique designs, our collection of artist-inspired
            merch is here to spark your imagination. From bold prints to
            minimalist masterpieces, our store offers something for every taste,
            reminding you that art is not just something you hang on a wall—it's
            a lifestyle.
          </Typography>

          <Typography>
            Our mission is simple: to empower artists and art lovers by bringing
            their passion into everyday life. Each item in our store is
            thoughtfully designed to reflect the soul of artistry, blending
            style with purpose. Whether you're rocking one of our exclusive
            tees, accessorizing with custom-designed pieces, or decorating your
            space with inspirational art, you'll find that every product carries
            its own story. So, why just admire art when you can wear it, live
            it, and share it with the world? Welcome to the chaos.
          </Typography>
          <Box sx={{ textAlign: "center", margin: 4 }}>
            {isSmallScreen ? (
              <iframe
                width="500px"
                height="281px"
                src="https://www.youtube.com/embed/qh7BCluk3wc?si=TKGqy5qfN8b1P2WL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <iframe
                width="600px"
                height="338px"
                src="https://www.youtube.com/embed/qh7BCluk3wc?si=TKGqy5qfN8b1P2WL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
          </Box>
          <Typography variant="h3">Artists</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {artists.map((e, index) => (
              <Card key={index}>
                <CardMedia
                  component="img"
                  image="647.webp"
                  sx={{ width: "100%" }} 
                />
                <CardContent>
                  <Typography>{e.name}</Typography>
                  <Typography>{e.description}</Typography>
                  <Link
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "purple" }}
                  >
                    {e.linktree}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default About;
