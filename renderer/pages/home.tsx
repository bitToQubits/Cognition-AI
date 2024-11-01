import { Title, Text, Container, SimpleGrid, Card, Group,Image, Center, Box } from '@mantine/core';
import { Dots } from './Dots';
import classes from './HeroText.module.css';
import React, { useEffect } from 'react';
import WinikoffCarousel from './Carousel';
import Faq from './Faq';
import {GetInTouch} from './GetInTouch';
import { Marquee } from '@gfazioli/mantine-marquee';
import { notifications } from "@mantine/notifications";

function HomePage() {

  useEffect(() => {

    const controlador_mobile = (action: string) => {
      switch(action){
        case "2":
          document.querySelector("#noticias").scrollIntoView({behavior: 'smooth'});
        break;

        case "3":
          document.querySelector("#productos").scrollIntoView({behavior: 'smooth'});
        break;

        case "1":
          document.querySelector("#inicio").scrollIntoView({behavior: 'smooth'});
        break;

        case "0":
          document.querySelector("#empresa").scrollIntoView({behavior: 'smooth'});
        break;

        case "4":
          document.querySelector("#testimonios").scrollIntoView({behavior: 'smooth'});
        break;

        case "5":
          document.querySelector("#faq").scrollIntoView({behavior: 'smooth'});
        break;

        case "6":
          document.querySelector("#contacto").scrollIntoView({behavior: 'smooth'});
        break;

        case "9":
          document.querySelector("#footer").scrollIntoView({behavior: 'smooth'});
        break;
      }
    }

    const enviar_mensaje = (respuesta: any) => {
      if(respuesta.status){
        notifications.show({
          title: 'Mensaje enviado',
          message: respuesta.content,
          color: 'teal',
        });
        console.log("Mensaje enviado con éxito", respuesta.content)
      }else{
        document.querySelector("#enviarForm").disabled = false;
        notifications.show({
          title: 'Error al enviar mensaje',
          message: respuesta.content,
          color: 'red',
        });
      }
    }

    window.ipc.on('control-app-mobile', controlador_mobile)
    window.ipc.on('enviar-mensaje', enviar_mensaje)
    
    return () => {
      window.ipc.off('control-app-mobile');
      window.ipc.off('enviar-mensaje');
    };

  }, []);

  return (
    <React.Fragment>
      <section className={classes.section} id="inicio">
      <Container className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

        <div className={classes.inner}>
          <Title className={`${classes.logo_principal} ${classes.text_center}`}>C\</Title>
          <Title className={`${classes.title} ${classes.text_center}`}>
            Desarrollando {' '}
            <Text component="span" className={classes.highlight} inherit>
              tecnología de IA
            </Text>{' '}
            de vanguardia
          </Title>
 
          <Container p={0} size={600}>
            <Text size="lg" c="dimmed" className={classes.description}>
              Investigacón y desarrollo de tecnología de IA de vanguardia para empresas y organizaciones.
              Innovación, y creación son nuestros valores fundamentales.
            </Text>
          </Container>
        </div>

      </Container>
      <Container>
        <SimpleGrid cols={2}>
          <div>
            <Card withBorder padding="lg" className={classes.card}>
              <Group justify="space-between" mt="xl">
                <Text fz="xl" fw={700}>
                  Construye con Winikoff
                </Text>
                <Group gap={5}>
                  <Text fz="xs" c="dimmed">
                    Acceso API
                  </Text>
                </Group>
              </Group>
              <Text mt="sm" mb="md" c="dimmed" fz="md">
                Comience a utilizar Winikoff para impulsar eficiencia y crear nuevas fuentes de ingresos.
              </Text>
            </Card>
          </div>
          <div>
            <Card withBorder padding="lg">
              <Group justify="space-between" mt="xl">
                <Text fz="xl" fw={700}>
                  Winikoff
                </Text>
                <Group gap={5}>
                  <Text fz="xs" c="dimmed">
                    Nuestro agente conversacional
                  </Text>
                </Group>
              </Group>
              <Text mt="sm" mb="md" c="dimmed" fz="md">
                Winikoff es un agente conversacional que puede ayudarte a realizar tareas, responder preguntas, y mucho más.
              </Text>
            </Card>
          </div>
        </SimpleGrid>
      </Container>
      </section>
      <section id="empresa">
        <Container fluid mr={40} ml={40}>
          <Title mt="64" mb="64" className={`${classes.title} ${classes.text_center}`}>Empresa enfocada en desarrollar IA segura y escalable</Title>
          <Marquee h="50vh" fadeEdges>
            <Box w="100vh">
              <SimpleGrid cols={2}>
                <div>
                  <Image radius="md" src="/images/investigacion.webp"/>
                </div>
                <div>
                  <h2>Investigación</h2>
                  <p>
                    Llevamos a cabo investigaciones de IA de frontera en una variedad de modalidades, y 
                    exploramos áreas de investigación de seguridad novedosas y emergentes, desde la 
                    interpretabilidad hasta AR, desde la retroalimentación humana hasta el 
                    análisis de impactos sociales y de políticas
                  </p>
                </div>
              </SimpleGrid>
            </Box>
            <Box w="100vh">
              <SimpleGrid cols={2}>
                <div>
                  <Image radius="md" src="/images/producto.webp"/>
                </div>
                <div>
                  <h2>Producto</h2>
                  <p>
                    Traducimos nuestra investigación en herramientas tangibles y prácticas como Winikoff que 
                    benefician a empresas, organizaciones sin fines de lucro y grupos de la sociedad civil, 
                    así como a sus clientes y personas de todo el mundo.
                  </p>
                </div>
              </SimpleGrid>
            </Box>
            <Box w="100vh">
              <SimpleGrid cols={2}>
                <div>
                  <Image radius="md" src="/images/operaciones.webp"/>
                </div>
                <div>
                  <h2>Operaciones</h2>
                  <p>
                    Nuestros equipos de gente, finanzas, legal y reclutamiento son los motores humanos 
                    que hacen que Anthropic funcione. Hemos tenido carreras previas en la NASA, startups y
                    las fuerzas armadas, y nuestras diversas experiencias ayudan a hacer de Cognition un 
                    excelente lugar para trabajar (¡y nos encantan las plantas!).
                  </p>
                </div>
              </SimpleGrid>
            </Box>
            <Box w="100vh">
              <SimpleGrid cols={2}>
                <div>
                  <Image radius="md" src="/images/politicas.webp"/>
                </div>
                <div>
                  <h2>Políticas</h2>
                  <p>
                    Pensamos en los impactos de nuestro trabajo y nos esforzamos por comunicar lo que estamos 
                    viendo en la frontera a los responsables políticos y a la sociedad civil en los EE. UU. y 
                    en el extranjero para ayudar a promover una IA segura y confiable.
                  </p>
                </div>
              </SimpleGrid>
            </Box>
          </Marquee>
        </Container>
      </section>
      <section className={classes.section} id="noticias">
        <Container>
          <h1 className={`${classes.title}`}>Noticias</h1>
          <SimpleGrid cols={3} mt={64}>
            <div>
              <Image radius="md" h="60vh" src="/images/api.webp"/>
              <Text  mt={10} fz="xl" fw={400}>Mejoras a la API de fine-tuning y expandiendo nuestro programa de modelos personalizados</Text>
            </div>
            <div>
              <Image radius="md" h="60vh" src="/images/apple.webp"/>
              <Text  mt={10} fz="xl" fw={400}>Cognition y Apple anuncian asociación</Text>
            </div>
            <div>
              <Image radius="md" h="60vh" src="/images/voices.webp"/>
              <Text mt={10} fz="xl" fw={400}>Navegando entre los retos y oportunidades de las voces sinteticas</Text>
            </div>
          </SimpleGrid>
        </Container>
      </section>
      <Container fluid mt={64} mb={64} id="productos">
        <Container mb={40}>
          <h1 className={`${classes.title}`}>Productos</h1>
        </Container>
        <WinikoffCarousel />
      </Container>
      <Container mb="5rem" mt="10rem" id="testimonios">
        <h1 className={`${classes.title} ${classes.text_center}`}>
          <Text component="span" className={classes.highlight} inherit>Amamos a nuestros clientes
          </Text>, y ellos a nosotros
        </h1>
        <SimpleGrid cols={3} mt={40}>
          <div className={classes.testimonial}>
            <Text mb={10} fz="xl" fw={400}>
              Excelente app, en mi empresa la usamos y ha sido de gran utilidad. La recomiendo.
            </Text>
            <Image radius="50%" h={70} className={classes.relative} left="38%" w={70} src="/images/john.jpg"/>
            <Text fz="md" fw="bold">John Feliz</Text>
          </div>
          <div className={classes.testimonial}>
            <Text mb={10} fz="xl" fw={400}>
              La app más moderna, completa, a cada persona que le muestro me dice lo mismo, super recomendada.
            </Text>
            <Image radius="50%" left="38%" className={classes.relative} h={70} w={70} src="/images/pablo.jpg"/>
            <Text fz="md" fw="bold">Pablo Mendoza</Text>
          </div>
          <div className={classes.testimonial}>
            <Text mb={10} fz="xl" fw={400}>
              Es la mejor app de IA que he probado estoy muy cómodo con ella la recomiendo.
            </Text>
            <Image radius="50%" left="38%" className={classes.relative} h={70} w={70} src="/images/amanda.jpg"/>
            <Text fz="md" fw="bold">Amanda Perez</Text>
          </div>
        </SimpleGrid>
      </Container>
      <Container size="sm" className={classes.wrapper} id="faq">
        <Title ta="center" className={`${classes.title} ${classes.text_center}`}>
          Preguntas frecuentes
        </Title>
        <Faq />
      </Container>
      <Container id="contacto">
        <Title mb={40} className={`${classes.title} ${classes.text_center}`}>
          ¿Tienes alguna pregunta? ¡Contáctanos!
        </Title>
        <GetInTouch />
      </Container>
    </React.Fragment>
  );
}

export default HomePage;