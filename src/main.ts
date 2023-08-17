import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // reasons why to use nest obj 
  // ts oop
  // it can be function all too
  // it can be untyped use of any 
  // eventually everything will be written in node js 
  // performance hit 20% but we get 150% faster development time
  // new tech don't give 2 shits about preform faster proof of concept and proof of value

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`Nova API`)
    .setDescription(
      `## Nova is a powerful project management application designed to enhance teamwork and task organization. Offering an intuitive interface, Nova enables seamless collaboration and efficient workflow management. Organize your projects using customizable boards and cards that represent tasks, ideas, or project milestones. 

These cards can be easily moved across different stages to reflect their progress. Nova fosters teamwork by 
      enabling team members to leave comments on cards, attach files, and assign tasks to specific individuals. 
      Whether you're coordinating projects, tracking tasks, or promoting team communication, Nova provides clarity 
      and efficiency, simplifying the complexities of project management.`,
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${3000}`)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    // extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
