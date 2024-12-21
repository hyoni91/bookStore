import React from 'react'

const CategoryManage = () => {
  return (
    <div>
      <div>카테고리 등록하기</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>카테고리입력</td>
              <td><input type='text'/></td>
            </tr>
          </tbody>
        </table>
        <button>등록완료</button>
      </div>
    </div>
  )
}

export default CategoryManage