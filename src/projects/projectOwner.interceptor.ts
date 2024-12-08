import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectOwnerInterceptor implements NestInterceptor {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  public async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const user_id = req.user.id;
    const project_id = req.params.project_id;
    const project = await this.projectsRepository.findByPk(project_id);

    if (project.user_id !== user_id) {
      throw new ForbiddenException();
    }
    return next.handle();
  }
}
