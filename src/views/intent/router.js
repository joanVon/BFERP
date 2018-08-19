import Intent from './index'
import UpdateProject from './updateProject'
import ProjectFlow from './projectFlow'

export default [
  {
    path: '/intent',
    name: 'Intent',
    component: Intent
  },
  {
    path: '/intent/project/:id',
    name: 'UpdateProject',
    component: UpdateProject
  },
  {
    path: '/intent/projectFlow/:id',
    name: 'ProjectFlow',
    component: ProjectFlow
  }
]
