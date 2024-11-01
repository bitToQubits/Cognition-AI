import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid } from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import bg from '../public/images/bg.svg';
import classes from './GetInTouch.module.css';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

export function GetInTouch() {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            nombre: '',
            email: '',
            tema: '',
            contenido: '',
        },

        validate: {
            nombre: (value) => (value.length > 0 ? null : 'Nombre es requerido'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
            tema: (value) => (value.length > 0 ? null : 'Tema es requerido'),
            contenido: (value) => (value.length > 0 ? null : 'Contenido es requerido'),
        },
    });

    function handleSubmit(values) {
        document.querySelector("#enviarForm").disabled = true;
        window.ipc.send('enviar-mensaje', values);
    }

  useEffect(() => {
    const controlador_mobile = (action: string) => {
      switch(action){
        case "7":
          form.setFieldValue('nombre', 'Jorge Perez');
          form.setFieldValue('email', 'jlbciriaco@gmail.com');
          form.setFieldValue('tema', 'Oportunidad de negocio');
          form.setFieldValue('contenido', 'Quiero saber si tienen alguna oportunidad de negocio para mi empresa que es también de tecnología');
        break;

        case "8":
          document.querySelector("#enviarForm").click();
        break;
      }
    }

    window.ipc.on('control-app-mobile', controlador_mobile)

    // return () => {
    //   window.ipc.off('control-app-mobile');
    // };


  }, []);

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ backgroundImage: `url(${bg.src})` }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Información de contacto
          </Text>

          <ContactIconsList />
        </div>

        <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
          <Text fz="lg" fw={700} className={classes.title}>
            Hablemos
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput label="Tu nombre" placeholder="Tu nombre"  id="nombre"
              key={form.key('nombre')}
              {...form.getInputProps('nombre')}/>
              <TextInput label="Tu email" placeholder="email@direccion.com"  id="email"
              key={form.key('email')}
              {...form.getInputProps('email')} />
            </SimpleGrid>

            <TextInput mt="md" label="Tema" placeholder="Tema" key={form.key('tema')} id="tema"
              {...form.getInputProps('tema')} />

            <Textarea
              mt="md"
              label="Tu mensaje"
              placeholder="Por favor, incluye toda la información relevante"
              minRows={3}
              id="mensaje"
            key={form.key('contenido')}
            {...form.getInputProps('contenido')}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" id="enviarForm" className={classes.control}>
                Enviar mensaje
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}