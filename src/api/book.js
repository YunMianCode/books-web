import { post } from '@/utils/request'

export default {
  pageList: query => post('/api/book/page/list', query),
  edit: query => post('/api/admin/books/edit', query),
  select: id => post('/api/book/page/list' + id),
  changeStatus: id => post('/api/book/changeStatus/' + id),
  deletePaper: id => post('/api/admin/books/delete/' + id)
}
