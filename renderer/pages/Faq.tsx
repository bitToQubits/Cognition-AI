import { Container, Title, Accordion } from '@mantine/core';
import classes from './faq.module.css';

export default function Faq() {
  return (
      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="que-es-cognition">
          <Accordion.Control>¿Qué es Cognition AI?</Accordion.Control>
          <Accordion.Panel>
            Cognition AI es un laboratorio de investigación y 
            despliegue de inteligencia artificial que se dedica a 
            contribuir a la comunidad científica mientras desarrolla 
            productos innovadores.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="productos-destacados">
          <Accordion.Control>¿Cuáles son algunos de los productos destacados de Cognition AI?</Accordion.Control>
          <Accordion.Panel>
            Algunos de sus productos más notables incluyen Winikoff, 
            un modelo de lenguaje avanzado; 
            Maquina del Sonido, que produce voces sintéticas y audios; 
            y VEIA, un modelo de visión por computadora.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="maquina-del-sonido">
          <Accordion.Control>¿Cómo funciona la Maquina del Sonido?</Accordion.Control>
          <Accordion.Panel>
            La Maquina del Sonido utiliza tecnologías avanzadas de síntesis de voz 
            para producir audios de alta calidad, permitiendo que las computadoras 
            hablen de una manera que haría que hasta Siri se sonrojara.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="winikoff">
          <Accordion.Control>¿Qué es Winikoff?</Accordion.Control>
          <Accordion.Panel>
            Winikoff es un potente modelo de lenguaje que no solo genera texto, 
            sino que también actúa como un agente capaz de controlar de manera 
            autónoma la computadora, llevando la automatización a un nuevo nivel de 
            "efectividad".
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="veia">
          <Accordion.Control>¿Qué aplicaciones tiene VEIA?</Accordion.Control>
          <Accordion.Panel>
            VEIA, el modelo de visión por computadora de Cognition AI, 
            se utiliza en diversas aplicaciones, desde el reconocimiento de 
            imágenes hasta la detección de objetos, permitiendo que las máquinas "vean" el mundo de manera más efectiva. No, no es como darles ojos, pero casi.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
  );
}