import type { Rule } from '@repo/types'
import { executeReviewCode } from '../../src/tools/review-code'

const rules: Rule[] = ['list-structure', 'listitem'].map(slug => ({
  slug,
  title: slug,
  categories: ['html'],
  primaryCategory: 'html',
  priority: 'high',
  content: '',
  url: `/rules/html/${slug}`,
  prompts: { check: '', fix: '', explain: '' }
}))

describe('JSX list structure', () => {
  it.each([
    'export const List = () => <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>',
    'export const List = () => <ul><ListItems /></ul>',
    'export const List = () => <ul><Items.Row /></ul>',
    '<ul>{items.map(item => <li>{item}</li>)}</ul>',
    '<ul><li>First</li><li>Second</li></ul>'
  ])('does not treat dynamic children as proven invalid markup: %s', code => {
    expect(executeReviewCode({ code, focus: ['html'], minPriority: 'low' }, rules).issues).toEqual(
      []
    )
  })

  it.each([
    'export const List = () => <ul><span>Invalid</span>{items.map(item => <li>{item}</li>)}</ul>',
    'export const List = () => <ul>Invalid text<li>Valid</li></ul>',
    '<ul>Invalid text<li>Valid</li></ul>',
    '<ul><div>Invalid</div></ul>'
  ])('retains literal invalid list children: %s', code => {
    expect(
      executeReviewCode({ code, focus: ['html'], minPriority: 'low' }, rules).issues.map(
        i => i.rule
      )
    ).toContain('list-structure')
  })

  it('retains literal orphaned JSX list items', () => {
    const code = 'export const List = () => <div><li>Invalid</li></div>'
    expect(
      executeReviewCode({ code, focus: ['html'], minPriority: 'low' }, rules).issues.map(
        i => i.rule
      )
    ).toContain('listitem')
  })
})
