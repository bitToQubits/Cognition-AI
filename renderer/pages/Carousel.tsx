import React, { useEffect, useRef, useState } from 'react';
import { Card, Text, Group, Flex, Box } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import { IconArrowNarrowRight, IconArrowNarrowLeft } from '@tabler/icons-react';

const slides = [
  {
    title: "Construye el futuro de la IA con Winikoff 3.2",
    subtitle: "Winikoff",
    description: "Estamos ampliando nuestra última versión de Winikoff 3.1 para ofrecer ahora modelos Winikoff 3.2 en 1B, 3B, 11B y 90B. Puedes comenzar de inmediato con nuestro ecosistema Winikoff y la red de socios.",
    leftBox: { numbers: ["1B", "3B"], label: "LIGERO" },
    rightBox: { numbers: ["90B", "11B"], label: "MULTIMODAL" },
    gradient: "linear-gradient(135deg, #1a1b1e 0%, #1864ab 50%, #1a1b1e 100%)"
  },
  {
    title: "Procesamiento Avanzado de Lenguaje",
    subtitle: "FUNCIONALIDADES",
    description: "Experimenta procesamiento de lenguaje natural de última generación con comprensión de contexto mejorada y generación de respuestas en múltiples idiomas.",
    leftBox: { numbers: ["8K", "32K"], label: "CONTEXTO" },
    rightBox: { numbers: ["100+", "GPU"], label: "OPTIMIZADO" },
    gradient: "linear-gradient(135deg, #2c0b3f 0%, #9d174d 50%, #2c0b3f 100%)"
  },
  {
    title: "Despliegue Listo para Empresas",
    subtitle: "DESPLIEGUE",
    description: "Despliega los modelos Winikoff con seguridad y escalabilidad de nivel empresarial. Adecuado para instalaciones en la nube y locales con soporte completo de API.",
    leftBox: { numbers: ["99.9%", "SLA"], label: "DISPONIBILIDAD" },
    rightBox: { numbers: ["API", "SDK"], label: "SOPORTE" },
    gradient: "linear-gradient(135deg, #1a365d 0%, #065f46 50%, #1a365d 100%)"
  }
];

const BoxContent = ({ data }) => {
  return (
    <Card 
      styles={{
        root: {
          backgroundColor: '#1a2942',
          padding: '1rem',
        }
      }}
    >
      {data.numbers.map((num, index) => (
        <Text 
          key={index} 
          size="xl" 
          fw={700} 
          c="white" 
          mb={index !== data.numbers.length - 1 ? "md" : "lg"}
        >
          {num}
        </Text>
      ))}
      <Text 
        size="sm" 
        c="white"
        styles={{
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
          }
        }}
      >
        {data.label}
      </Text>
    </Card>
  );
};

const CarouselSlide = ({ data,data_height }) => {
  
  return (
    <Card 
      styles={{
        root: {
          background: data.gradient,
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }
      }}
      radius="lg"
      shadow="xl"
      h="55vh"
    >

      <Group justify="center"
        ml={40} 
        mr={40}
        grow
      >
        <Group gap="md" w="40%" grow style={{position: "relative"}} top={data_height / 5}>
          <BoxContent data={data.leftBox} />
          <BoxContent data={data.rightBox} />
        </Group>

        <Box w="60%" style={{position: "relative"}} top={data_height / 5}>
          <Text c="white" size="sm" mb="xs">
            {data.subtitle}
          </Text>
          <Text size="xl" fw={700} c="white" mb="md">
            {data.title}
          </Text>
          <Text c="gray.3" mb="lg">
            {data.description}
          </Text>
        </Box>
      </Group>
    </Card>
  );
};

const WinikoffCarousel = () => {

  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {

    const controlador_mobile_carousel = (action: string) => {
      if(action == "11"){
        embla?.scrollNext();
      }

      if(action == "12"){
        embla?.scrollPrev();
      }
    }

    window.ipc.on('control-app-mobile', controlador_mobile_carousel);

  }, [embla]);

  const elementRef = useRef(null); // Referencia al elemento

  const [height, setHeight] = useState(0); // Estado para el ancho

  useEffect(() => {
    const updateHeight = () => {
      if (elementRef.current) {
        setHeight(elementRef.current.offsetHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight(); // Actualiza el ancho en cada cambio de tamaño
    });

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current); // Observa el elemento
      updateHeight(); // Inicializa con el tamaño actual
    }

    // Cleanup al desmontar
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
      <Carousel
        withIndicators
        loop
        ref={elementRef}
        nextControlIcon={<IconArrowNarrowRight size={16} />}
        previousControlIcon={<IconArrowNarrowLeft size={16} />}
        getEmblaApi={setEmbla}
        styles={{
          control: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
          indicator: {
            width: 8,
            height: 8,
            transition: 'width 250ms ease',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            
            '&[data-active]': {
              width: 24,
              backgroundColor: 'white',
            },
          },
        }}
      >
        {slides.map((slide, index) => (
          <Carousel.Slide key={index}>
            <CarouselSlide data_height={height} data={slide} />
          </Carousel.Slide>
        ))}
      </Carousel>
  );
};

export default WinikoffCarousel;