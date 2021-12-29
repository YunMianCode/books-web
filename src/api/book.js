import { post } from '@/utils/request'

export default {
  pageList: query => post('/api/book/page/list', query),
  edit: query => post('/api/admin/books/edit', query),
  select: id => post('/api/admin/books/select/' + id),
  deletePaper: id => post('/api/admin/books/delete/' + id)
}
