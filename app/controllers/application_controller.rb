class ApplicationController < ActionController::Base

  before_action :authenticate_user!
  protect_from_forgery with: :exception

  # generic helper responsibe for performing a full search including support
  # for sorting, paging and filtering.
  def process_search(model, format=:json, options={})
    page = params[:current] || 1
    limit = params[:rowCount] || 10

    query = build_query(model, options[:where])
    total = query.count

    # results =  limit == '-1' ? query : query.page(page).per(limit).all.to_a
    results =  limit == '-1' ? query : query.page(page).per(10).all.to_a
    Studio::Search.format_response(results, page.to_i, total )
  end # def process_search

  # The query will be dynamically established based on the parameters supplied
  # from the request. This will handle sorting, search, pagination and support
  # for tenancy.
  def build_query(model, where_clause)
    sort = params[:sort] || {}

    criteria = params[:searchPhrase]
    # query = (model.respond_to? :search) ? model.send(:search, criteria) : model

    query = Studio::Search.send(model.name.downcase.to_sym, criteria)

    query = query.where(where_clause) if where_clause

    sort.each do |k,v|
      query = query.order(k.to_sym => v)
    end

    query

  end # def build_query

  def set_current_user
    User.current = current_user
  end

end
