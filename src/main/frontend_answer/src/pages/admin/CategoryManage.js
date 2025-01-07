import React from 'react'

const CategoryManage = () => {
  return (
    <div>
      <div>カテゴリー登録</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>カテゴリー入力</td>
              <td><input type='text'/></td>
            </tr>
          </tbody>
        </table>
        <button>登録する</button>
      </div>
    </div>
  )
}

export default CategoryManage