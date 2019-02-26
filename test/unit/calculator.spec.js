describe('calculator', () => {
    beforeEach(function() {
        var fixture = '<div id="fixture"><input id="x" type="text">' + 
          '<input id="y" type="text">' + 
          '<input id="add" type="button" value="Add Numbers">' +
          'Result: <span id="result" /></div>';
    
        document.body.insertAdjacentHTML(
          'afterbegin', 
          fixture);
      });
    
      // remove the html fixture from the DOM
      afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
      });

    // call the init function of calculator to register DOM elements
    beforeEach(function() {
        window.calculator.init();
    });

      it('should return 3 for 1 + 2', function() {
        document.getElementById('x').value = 1;
        document.getElementById('y').value = 2;
        document.getElementById('add').click();
        expect(document.getElementById('result').innerHTML).toBe('3');
      });
});


HTTPメソッドAMLアクションコメ
GET get アイテム取得
POST add アイテム新規追加
POST create アイテム存在しない場合新規追加
PUT edit アイテムの一つプロパティを更新
PATCH edit アイテムのロッ 保存－ア ロッ
PATCH update ロッ 済みアイテムを保存
PATCH lock アイテムをロッ
PATCH unlock アイテムをア ロッ
PATCH merge アイテム更新、存在しない場合新規追加
DELETE delete アイテム削除
DELETE purge アイテムの特定 ジョ を削除


■全アイテムの取得

http://143.94.38.60/InnovatorServer/server/odata/Part


■結果でページングの利用

・アイテムカウントを返す($count)
/Part/$count
・アイテムと共にアイテムカウント($count)を返す
/Part?$count=true
・先頭N個アイテムを返す($top)
/Part?$top=10
・アイテムの並び替え($orderby)
/Part?$orderby=item_number,name
・先頭から指定したN個アイテムを省略($skip)
/Part?$skip=10

■アイテムクエリ―のオプション
・アイテムID
/Part('C178DF9A420C4E8A8C9A058F27D662CF')
・特定プロパティ値を返す
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/item_number
・($value)でRawValueを返す
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/item_number/$value
・クエリ―オプション：$select
/Part?$select=name,description
・全てのプロパティを返す（nullプロパティも含む)
/Part?$select=*

■クエリ―オプション：$filter
・プロパティ条件(eq, ne, gt, ge, lt, le)
/Part?$filter=cost gt 100
・論理演算子(and, or, not)
/Part?$filter=cost gt 100 and classification eq 'Product'
/Part?$filter=((cost gt 100) and (cost lt 1000)) or make_buy eq Make
・Contains
/Part?$filter=contains(name, 'Cable')
・StartsWith/EndsWith
/Part?$filter=endsWith(name, 'Assembly')

■クエリ―オプション：$expand
・アイテムプロパティで参照されたアイテムを返す
/Part?$expand=created_by_id
・リレーションシップアイテムを返す
/Part?$expand=created_by_id
/Part?$filter=item_number eq 'C4703A' & $expand=Part BOM
・リレーティッドアイテムを返す
/Part?$filter=item_number eq 'C4703A' & $expand=Part BOM($expand=related_id)


■新規アイテムの追加

・プロパティ値と共に新規アイテム追加
HTTP POST
/Part

{
  item_number: ''
  name: ''
  description: ''
}

■新規アイテムと共に参照アイテムの追加
・アイテムプロパティを既存アイテムへの参照
{
  item_number: ''
  name: ''
  owned_by_id:@odata.bind: Identity('AGDFGDGGDGDGDGDGD')
}

・アイテムプロパティを新規アイテムへの参照
{
  item_number: ''
  name: ''
  owned_by_id：{ 
	name: "Design Group", 
	is_arias: "0"
  }
}

■新規リレーティッドアイテムと共にリレーションシップアイテムを追加
{
  "item_number": "a"
  "name": 'test1'
  "Part BOM"：[
     { 
        "quantity": "2",
        "related_id" :{
	   "item_number": "b"
 	    "name":"test2"
         }
     }
  ]
}

■既存リレーティッドアイテムと共にリレーションシップアイテムを追加
{
  "item_number": "a"
  "name": 'test1'
  "Part BOM"：[
     { 
        "quantity": "2",
        "related_id@odata.bind": "Part('aaaaaaddddddddddddd')"
     }
  ]
}

■アイテムの更新その1

HTTP PATCH

・既存アイテムのプロパティを編集する
/Part('C178DF9A420C4E8A8C9A058F27D662CF')
{
   "description": "aaaaaa"
}

■アイテムの更新その2
・lockとupdateアクションでアイテム更新
/Part('C178DF9A420C4E8A8C9A058F27D662CF')
{
  "@aras.action": "lock"
}
{
  "@aras.action": "update",
  "description": "updated value"
}
{
  "@aras.action": "unlock"
}

■アイテムの更新その3
HTTP PUT
・プロパティ値の変更
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/unit
{
  "value": "test"
}
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/unit/$value
"test"

■アイテムの削除
HTTP DELETE
・既存アイテムの削除(全てのバージョン)
/Part('C178DF9A420C4E8A8C9A058F27D662CF')
・特定のアイテムバージョンのパージ
/Part('C178DF9A420C4E8A8C9A058F27D662CF')
{
  "@aras.action": "purge"
}

■リレーションシップの削除
HTTP DELETE
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/Part Document/$ref?$id=Part Document('C178DF9A420C4E8A8C9A058F27D662CF')
・アイテムプロパティのクリア
/Part('C178DF9A420C4E8A8C9A058F27D662CF')/owned_by_id/$ref

■サーバーメソッドの実行
HTTP POST
・メソッドはコンテキストアイテムとして実行
/method.TRNGetUsers
・特定アイテムコンテキストをメソッド実行
/Sales Order('C178DF9A420C4E8A8C9A058F27D662CF')/method.Server-CalculateCost
・Request Payloadでアイテムコンテキストを指定し、メソッド実行
/method.Server-CalculateCost
{
  "odata.type": "http;//host/data/$metadata#Sales Order",
  "id": "C178DF9A420C4E8A8C9A058F27D662CF"
}
