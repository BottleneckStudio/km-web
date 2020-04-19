config:
	@echo "  -> creating AWS Config from template file"
	@cat aws-exports.tmpl | sed "s/\$$AWS_COGNITO_IDENTITY_POOL_ID/${AWS_COGNITO_IDP}/g" \
		| sed "s/\$$AWS_COGNITO_USER_POOL_ID/${AWS_USER_POOL_ID}/g" \
		| sed "s/\$$AWS_COGNITO_POOL_WEB_CLIENT_ID/${AWS_USER_POOL_CLIENT_ID}/g" \
		> src/aws-exports.json