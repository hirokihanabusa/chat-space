json.(@message, :content, :image)
json.id  @message.id
json.content  @message.content
json.image  @message.image.url
json.group_id  @message.group.id
json.user_name  @message.user.name
json.date  @message.created_at.strftime("%Y/%m/%d %H:%M")
